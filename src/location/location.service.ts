import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  Logger,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export interface IBGEState {
  id: number;
  sigla: string;
  nome: string;
}

export interface IBGECity {
  id: number;
  nome: string;
}

interface CachedData<T> {
  data: T;
  timestamp: number;
}

interface CitiesFileCity {
  id: number;
  nome: string;
  microrregiao?: {
    mesorregiao?: {
      UF?: {
        id: number;
        sigla: string;
        nome: string;
      };
    };
  };
}

@Injectable()
export class LocationService {
  private readonly logger = new Logger(LocationService.name);
  
  // Cache em memória com TTL de 1 hora
  private readonly CACHE_TTL = 60 * 60 * 1000; // 1 hora em ms
  private readonly FETCH_TIMEOUT_MS = 8000;
  private statesCache: CachedData<IBGEState[]> | null = null;
  private citiesCache: Map<string, CachedData<IBGECity[]>> = new Map();
  private citiesFileCache: CitiesFileCity[] | null = null;
  private statesFileCache: IBGEState[] | null = null;

  // URLs da API do IBGE
  private readonly IBGE_STATES_URL = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
  private readonly IBGE_CITIES_URL = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

  /**
   * Retorna todos os estados do Brasil ordenados por nome
   */
  async getStates(): Promise<IBGEState[]> {
    // Verificar cache
    if (this.statesCache && !this.isCacheExpired(this.statesCache.timestamp)) {
      return this.statesCache.data;
    }

    try {
      const response = await this.fetchWithTimeout(
        `${this.IBGE_STATES_URL}?orderBy=nome`
      );

      if (!response.ok) {
        const text = await response.text();
        throw new BadGatewayException(
          `IBGE API error: ${response.status} - ${text.slice(0, 200)}`
        );
      }

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        const text = await response.text();
        throw new BadGatewayException(
          `IBGE API non-JSON response: ${contentType} - ${text.slice(0, 200)}`
        );
      }

      const states: IBGEState[] = await response.json();
      
      // Atualizar cache
      this.statesCache = {
        data: states,
        timestamp: Date.now(),
      };

      return states;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      this.logger.error('Erro ao buscar estados do IBGE:', error);
      
      // Retornar cache expirado se disponível
      if (this.statesCache) {
        this.logger.warn('Retornando estados do cache expirado');
        return this.statesCache.data;
      }

      // Fallback: carregar estados do arquivo local cities.json
      const fileStates = this.getStatesFromFile();
      if (fileStates.length > 0) {
        this.logger.warn('Retornando estados do arquivo local cities.json');
        this.statesCache = {
          data: fileStates,
          timestamp: Date.now(),
        };
        return fileStates;
      }
      
      throw error;
    }
  }

  /**
   * Retorna todas as cidades de um estado ordenadas por nome
   * @param uf Sigla do estado (ex: MG, SP, RJ)
   */
  async getCitiesByState(uf: string): Promise<IBGECity[]> {
    const ufUpper = uf.trim().toUpperCase();
    if (!/^[A-Z]{2}$/.test(ufUpper)) {
      throw new BadRequestException('UF inválida');
    }
    const statesForValidation = this.statesCache?.data ?? this.getStatesFromFile();
    if (
      statesForValidation.length > 0 &&
      !statesForValidation.some((state) => state.sigla === ufUpper)
    ) {
      throw new BadRequestException('UF inválida');
    }
    
    // Verificar cache
    const cached = this.citiesCache.get(ufUpper);
    if (cached && !this.isCacheExpired(cached.timestamp)) {
      return cached.data;
    }

    try {
      const response = await this.fetchWithTimeout(
        `${this.IBGE_CITIES_URL}/${ufUpper}/municipios?orderBy=nome`
      );

      if (!response.ok) {
        const text = await response.text();
        throw new BadGatewayException(
          `IBGE API error: ${response.status} - ${text.slice(0, 200)}`
        );
      }

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        const text = await response.text();
        throw new BadGatewayException(
          `IBGE API non-JSON response: ${contentType} - ${text.slice(0, 200)}`
        );
      }

      const cities: IBGECity[] = await response.json();
      
      // Atualizar cache
      this.citiesCache.set(ufUpper, {
        data: cities,
        timestamp: Date.now(),
      });

      return cities;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      this.logger.error(`Erro ao buscar cidades de ${ufUpper}:`, error);
      
      // Retornar cache expirado se disponível
      if (cached) {
        this.logger.warn(`Retornando cidades de ${ufUpper} do cache expirado`);
        return cached.data;
      }

      // Fallback: carregar cidades do arquivo local cities.json
      const fileCities = this.getCitiesFromFile(ufUpper);
      if (fileCities.length > 0) {
        this.logger.warn(`Retornando cidades de ${ufUpper} do arquivo local cities.json`);
        this.citiesCache.set(ufUpper, {
          data: fileCities,
          timestamp: Date.now(),
        });
        return fileCities;
      }
      
      throw error;
    }
  }

  /**
   * Verifica se o cache expirou
   */
  private isCacheExpired(timestamp: number): boolean {
    return Date.now() - timestamp > this.CACHE_TTL;
  }

  private loadCitiesFile(): CitiesFileCity[] {
    if (this.citiesFileCache) {
      return this.citiesFileCache;
    }

    const filePath = path.join(process.cwd(), 'cities.json');
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(raw) as CitiesFileCity[];
    this.citiesFileCache = parsed;
    return parsed;
  }

  private async fetchWithTimeout(url: string): Promise<Response> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.FETCH_TIMEOUT_MS);

    try {
      return await fetch(url, {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'contratamusico-backend/1.0',
        },
        signal: controller.signal,
      });
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new BadGatewayException('IBGE API timeout');
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }

  private getStatesFromFile(): IBGEState[] {
    if (this.statesFileCache) {
      return this.statesFileCache;
    }

    try {
      const cities = this.loadCitiesFile();
      const map = new Map<string, IBGEState>();

      for (const city of cities) {
        const uf = city.microrregiao?.mesorregiao?.UF;
        if (uf && uf.sigla && !map.has(uf.sigla)) {
          map.set(uf.sigla, { id: uf.id, sigla: uf.sigla, nome: uf.nome });
        }
      }

      const states = Array.from(map.values()).sort((a, b) =>
        a.nome.localeCompare(b.nome, 'pt-BR')
      );
      this.statesFileCache = states;
      return states;
    } catch (error) {
      this.logger.error('Erro ao carregar estados do cities.json:', error);
      return [];
    }
  }

  private getCitiesFromFile(uf: string): IBGECity[] {
    try {
      const cities = this.loadCitiesFile();
      return cities
        .filter(
          (city) => city.microrregiao?.mesorregiao?.UF?.sigla === uf
        )
        .map((city) => ({ id: city.id, nome: city.nome }))
        .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    } catch (error) {
      this.logger.error(`Erro ao carregar cidades de ${uf} do cities.json:`, error);
      return [];
    }
  }
}
