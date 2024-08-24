export class QueryResult {
    singleResult: any;
    results: any[];
    rowsAffected: number;
  
    constructor(queryResult: any) {
      this.results = queryResult.recordset || [];
      this.singleResult = this.results.length > 0 ? this.results[0] : null;
      this.rowsAffected = queryResult.rowsAffected ? queryResult.rowsAffected[0] : 0;
    }
  }
  