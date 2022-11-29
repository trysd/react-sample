import styles from './Home.module.scss';
import { v4 as uuid } from "uuid";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export const HomeComponent = () => {
  return (
    <div className={styles.root}>
      <p>Home: {uuid()}</p>
      <Stack direction="row" spacing={2}>
        <Button variant="outlined">login</Button>
        {/* <LoadingButton
          loading
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="outlined"
        >
          Save
        </LoadingButton> */}
      </Stack>
    </div>
  );
};
