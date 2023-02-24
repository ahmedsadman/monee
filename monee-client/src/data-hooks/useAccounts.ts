import axios from "axios";
import { useState, useCallback, useEffect } from "react";

import { Account } from "../common/types";

function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);

  const fetchAccounts = useCallback(() => {
    axios.get("/api/accounts").then((res) => setAccounts(res.data));
  }, []);

  const uploadStatement = useCallback(async (accountId: number, file: File) => {
    const data = new FormData();
    data.append("file", file);

    const headers = {
      "Content-Type": "multipart/form-data",
    };

    return axios.post(`/api/accounts/${accountId}/upload-statement`, data, {
      headers,
    });
  }, []);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  return { accounts, uploadStatement };
}

export default useAccounts;
