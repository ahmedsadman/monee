import axios from "axios";
import { useState, useCallback, useEffect } from "react";

import { Account } from "../common/types";

function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);

  const fetchAccounts = useCallback(() => {
    axios.get("/api/accounts").then((res) => setAccounts(res.data));
  }, []);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  return { accounts };
}

export default useAccounts;
