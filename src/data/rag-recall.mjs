// Recall@10 por modelo de embedding, no conjunto literal (214 perguntas) e no de paráfrases (214).
// Fonte: dados/resultados/figuras/recall-por-modelo.csv do repositório público
// github.com/faculdade/docs-designed-for-retrieval (licença MIT), lido em 2026-11-16.
export const ragRecall = [
  {
    "modelo": "paraphrase-multilingual-mpnet",
    "tipo": "local",
    "teste": 0.9907,
    "parafrase": 0.5187
  },
  {
    "modelo": "f2llm-v2-0.6b",
    "tipo": "local",
    "teste": 0.9953,
    "parafrase": 0.6776
  },
  {
    "modelo": "multilingual-e5-large",
    "tipo": "local",
    "teste": 0.986,
    "parafrase": 0.7009
  },
  {
    "modelo": "nomic-embed-text-v2-moe",
    "tipo": "local",
    "teste": 0.9813,
    "parafrase": 0.7103
  },
  {
    "modelo": "jina-embeddings-v3",
    "tipo": "local",
    "teste": 0.986,
    "parafrase": 0.715
  },
  {
    "modelo": "f2llm-v2-4b",
    "tipo": "local",
    "teste": 0.9953,
    "parafrase": 0.7196
  },
  {
    "modelo": "snowflake-arctic-embed-l-v2.0",
    "tipo": "local",
    "teste": 0.9813,
    "parafrase": 0.743
  },
  {
    "modelo": "bge-m3",
    "tipo": "local",
    "teste": 0.9907,
    "parafrase": 0.7477
  },
  {
    "modelo": "gemini-embedding-001",
    "tipo": "api_gemini",
    "teste": 0.9813,
    "parafrase": 0.7664
  },
  {
    "modelo": "multilingual-e5-base",
    "tipo": "local",
    "teste": 0.986,
    "parafrase": 0.785
  },
  {
    "modelo": "embeddinggemma-300m",
    "tipo": "local",
    "teste": 0.9953,
    "parafrase": 0.7897
  },
  {
    "modelo": "multilingual-e5-large-instruct",
    "tipo": "local",
    "teste": 0.9953,
    "parafrase": 0.7944
  },
  {
    "modelo": "qwen3-embedding-4b",
    "tipo": "local",
    "teste": 0.9907,
    "parafrase": 0.7991
  },
  {
    "modelo": "qwen3-embedding-0.6b",
    "tipo": "local",
    "teste": 0.9953,
    "parafrase": 0.8178
  },
  {
    "modelo": "kalm-embedding-mini-v1.5",
    "tipo": "local",
    "teste": 0.9953,
    "parafrase": 0.8271
  },
  {
    "modelo": "gemini-embedding-2",
    "tipo": "api_gemini",
    "teste": 0.986,
    "parafrase": 0.8458
  },
  {
    "modelo": "granite-embedding-311m-r2",
    "tipo": "local",
    "teste": 0.9953,
    "parafrase": 0.8458
  },
  {
    "modelo": "serafim-900m-ir",
    "tipo": "local",
    "teste": 1.0,
    "parafrase": 0.8458
  },
  {
    "modelo": "voyage-4-large",
    "tipo": "api",
    "teste": 0.9953,
    "parafrase": 0.8551
  },
  {
    "modelo": "octen-embedding-0.6b",
    "tipo": "local",
    "teste": 0.9953,
    "parafrase": 0.8598
  },
  {
    "modelo": "voyage-context-4",
    "tipo": "api_contextual",
    "teste": 1.0,
    "parafrase": 0.8598
  },
  {
    "modelo": "gte-multilingual-base",
    "tipo": "local",
    "teste": 0.9953,
    "parafrase": 0.8879
  },
  {
    "modelo": "voyage-3-large",
    "tipo": "api",
    "teste": 0.9953,
    "parafrase": 0.8879
  },
  {
    "modelo": "producao (voyage-context-4, indice 3.32.0)",
    "tipo": "producao",
    "teste": 1.0,
    "parafrase": 0.8738
  }
];
