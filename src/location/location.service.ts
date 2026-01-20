import { Injectable, Logger } from '@nestjs/common';

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

@Injectable()
export class LocationService {
  private readonly logger = new Logger(LocationService.name);
  
  // Cache em memória com TTL de 1 hora
  private readonly CACHE_TTL = 60 * 60 * 1000; // 1 hora em ms
  private statesCache: CachedData<IBGEState[]> | null = null;
  private citiesCache: Map<string, CachedData<IBGECity[]>> = new Map();

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
      const response = await fetch(`${this.IBGE_STATES_URL}?orderBy=nome`);
      
      if (!response.ok) {
        throw new Error(`IBGE API error: ${response.status}`);
      }

      const states: IBGEState[] = await response.json();
      
      // Atualizar cache
      this.statesCache = {
        data: states,
        timestamp: Date.now(),
      };

      return states;
    } catch (error) {
      this.logger.error('Erro ao buscar estados do IBGE:', error);
      
      // Retornar cache expirado se disponível
      if (this.statesCache) {
        this.logger.warn('Retornando estados do cache expirado');
        return this.statesCache.data;
      }
      
      throw error;
    }
  }

  /**
   * Retorna todas as cidades de um estado ordenadas por nome
   * @param uf Sigla do estado (ex: MG, SP, RJ)
   */
  async getCitiesByState(uf: string): Promise<IBGECity[]> {
    const ufUpper = uf.toUpperCase();
    
    // Verificar cache
    const cached = this.citiesCache.get(ufUpper);
    if (cached && !this.isCacheExpired(cached.timestamp)) {
      return cached.data;
    }

    try {
      const response = await fetch(
        `${this.IBGE_CITIES_URL}/${ufUpper}/municipios?orderBy=nome`
      );
      
      if (!response.ok) {
        throw new Error(`IBGE API error: ${response.status}`);
      }

      const cities: IBGECity[] = await response.json();
      
      // Atualizar cache
      this.citiesCache.set(ufUpper, {
        data: cities,
        timestamp: Date.now(),
      });

      return cities;
    } catch (error) {
      this.logger.error(`Erro ao buscar cidades de ${ufUpper}:`, error);
      
      // Retornar cache expirado se disponível
      if (cached) {
        this.logger.warn(`Retornando cidades de ${ufUpper} do cache expirado`);
        return cached.data;
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
}
