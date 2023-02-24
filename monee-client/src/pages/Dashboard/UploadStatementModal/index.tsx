import { useState } from "react";
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
  const { accounts } = useAccounts();
  const [selectedAccount, setSelectedAccount] = useState<string>();
  const [selectedFile, setSelectedFile] = useState<File | undefined>();

  return (
    <Modal show={show} onClose={onClose}>
      <>
        <FormControl fullWidth>
          <InputLabel>Account</InputLabel>
          <Select
            label="Account"
            value={selectedAccount || accounts?.[0]?.bank_identifier || ""}
            onChange={(e) => setSelectedAccount(e.target.value)}
          >
            {accounts.map((account) => (
              <MenuItem
                value={account.bank_identifier}
                key={account.id}
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
          <Button variant="contained" sx={{ mr: 1 }} disabled={!selectedFile}>
            Done
          </Button>
          <Button variant="outlined" onClick={onClose}>
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
