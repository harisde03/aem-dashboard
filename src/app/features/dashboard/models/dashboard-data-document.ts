import { DbDocument } from "src/app/core/models/db-document";
import { Chart } from "src/app/features/dashboard/models/chart";
import { User } from "src/app/features/dashboard/models/user";

export interface DashboardDataDocument extends DbDocument {
    chartDonut: Chart[];
    chartBar: Chart[];
    tableUsers: User[];
    lastUpdated: string | null;
}
