import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  // Salvar dados no localStorage
  save<T>(key: string, data: T): void {
    try {
      const jsonData = JSON.stringify(data);
      localStorage.setItem(key, jsonData);
    } catch (error) {
      console.error('❌ Erro ao salvar dados:', error);
    }
  }

  // Carregar dados do localStorage
  load<T>(key: string): T | null {
    try {
      const jsonData = localStorage.getItem(key);
      if (jsonData) {
        return JSON.parse(jsonData) as T;
      }
      return null;
    } catch (error) {
      console.error('❌ Erro ao carregar dados:', error);
      return null;
    }
  }

  // Remover dados do localStorage
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('❌ Erro ao remover dados:', error);
    }
  }

  // Limpar todo o localStorage
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('❌ Erro ao limpar localStorage:', error);
    }
  }
}