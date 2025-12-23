import database from "infra/database.js";
import { use } from "react";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const VersionQuery = await database.query("SHOW server_version;");
  const version = VersionQuery.rows[0].server_version;

  const MaxReqQuery = await database.query("SHOW max_connections;");
  const maxConnections = MaxReqQuery.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const UsedConnectionsQuery = await database.query({
    text: "SELECT count(*) FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const usedConnections = UsedConnectionsQuery.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: version,
        max_connections: parseInt(maxConnections),
        used_connections: parseInt(usedConnections),
      },
    },
  });
}

export default status;

/*retornar versão do postgres
retornar quantidade de conexões máximas disponibilizadas pelo banco de dados
retornar conexões usadas
*/
