import { supabase } from "./supabase";

export const initializeDatabase = async () => {
  const { error: tasksError } = await supabase.rpc(
    "create_tasks_table_if_not_exists"
  );
  if (tasksError) {
    console.error("Error creating tasks table:", tasksError);
  }

  const { error: categoriesError } = await supabase.rpc(
    "create_categories_table_if_not_exists"
  );
  if (categoriesError) {
    console.error("Error creating categories table:", categoriesError);
  }
};
