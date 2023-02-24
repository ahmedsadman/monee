import { useState, useCallback, useEffect } from "react";
import {
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Button,
  Box,
} from "@mui/material";

import Modal from "../../../common/components/Modal";
import useAccounts from "../../../data-hooks/useAccounts";

function UploadStatementModal({ show, onClose }: ModalProps) {
  const { accounts, uploadStatement } = useAccounts();
  const [selectedAccount, setSelectedAccount] = useState<number | undefined>();
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [loading, setLoading] = useState(false);

  const handleStatementUpload = useCallback(async () => {
    if (!selectedAccount || !selectedFile) {
      return;
    }

    setLoading(true);
    await uploadStatement(selectedAccount, selectedFile);
    setLoading(false);
    onClose();
  }, [selectedAccount, onClose, selectedFile, uploadStatement]);

  useEffect(() => {
    setSelectedAccount(accounts?.[0]?.id);
  }, [accounts]);

  return (
    <Modal show={show} onClose={onClose}>
      <>
        <FormControl fullWidth>
          <InputLabel>Account</InputLabel>
          <Select
            label="Account"
            value={selectedAccount || ""}
            onChange={(e) => setSelectedAccount(Number(e.target.value))}
          >
            {accounts.map((account) => (
              <MenuItem
                value={account.id.toString()}
                key={account.id.toString()}
              >{`${account.title} - ${account.bank_identifier}`}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <input
          type="file"
          onChange={(e) => setSelectedFile(e?.target?.files?.[0])}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{ mr: 1 }}
            disabled={!selectedFile || loading}
            onClick={handleStatementUpload}
          >
            Done
          </Button>
          <Button variant="outlined" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
        </Box>
      </>
    </Modal>
  );
}

type ModalProps = {
  show: boolean;
  onClose: () => void;
};

export default UploadStatementModal;
