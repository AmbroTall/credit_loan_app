import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitUploadFiles } from "../../state/features/docs/docActions";
import { docStateUpdate } from "../../state/features/docs/docSlice";
import Account1 from "./positiveAccounts/Account1";

const links = [
  "https://www.boompay.app/boomreport",
  "https://kikoff.com/",
  "https://www.self.inc/",
  "https://www.creditstrong.com/",
  "experian.com/consumer-products/score-boost.html?pc=sem_exp_google&cc=sem_exp_google_ad_1651407997_65972645920_379826966571_aud-942381786946:kwd-585063777506_e___k_CjwKCAjwpKyYBhB7EiwAU2Hn2c9Xv7mEBBfnOVL7BnMcCnuQU0kqDy3xvCwIhMBmS5ch6yWJL4dHpBoCSLUQAvD_BwE_k_&ref=brand&awsearchcpc=1&gclid=CjwKCAjwpKyYBhB7EiwAU2Hn2c9Xv7mEBBfnOVL7BnMcCnuQU0kqDy3xvCwIhMBmS5ch6yWJL4dHpBoCSLUQAvD_BwE",
  "https://www.credit.com/extracredit/adv/trackit2?ref_id=0c41a1ae-6540-47b7-9d92-fb6f60c1b97e&end_user_type=MARKET_PLACE&pl=blog&af=32806",
];

const PositiveAccount = (props, ref) => {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [checkedAccount, setCheckedAccount] = useState(false);
  const theme = useTheme();

  useImperativeHandle(ref, () => ({
    open() {
      setOpen(true);
    },
    checked: checked,
  }));

  const dispatch = useDispatch();

  const {
    photo_ID,
    proof_of_address,
    user_agreement_freeze,
    lexis_nexis_freeze,
    consumer_office_freeze,
    positive_account,
  } = useSelector((store) => store.docs);
  const { email } = useSelector((store) => store.auth);

  const onChange = () => {
    setCheckedAccount((prev) => !prev);
  };

  useEffect(() => {
    if (checkedAccount) {
      dispatch(
        docStateUpdate({
          photo_ID,
          email,
          proof_of_address,
          user_agreement_freeze,
          consumer_office_freeze,
          lexis_nexis_freeze,
          positive_account: checkedAccount,
        })
      );
    } else {
      docStateUpdate({
        photo_ID,
        email,
        proof_of_address,
        user_agreement_freeze,
        consumer_office_freeze,
        lexis_nexis_freeze,
        positive_account: checkedAccount,
      });
    }
  }, [
    checkedAccount,
    consumer_office_freeze,
    dispatch,
    email,
    lexis_nexis_freeze,
    photo_ID,
    proof_of_address,
    user_agreement_freeze,
  ]);

  const handleClose = () => {
    setOpen(false);

    dispatch(
      submitUploadFiles({
        photo_ID,
        email,
        proof_of_address,
        user_agreement_freeze,
        consumer_office_freeze,
        lexis_nexis_freeze,
        positive_account,
      })
    );
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                variant="h6"
                textAlign="center"
                sx={{
                  fontWeight: 800,
                  color: theme.palette.grey[800],
                }}
              >
                Positive Account
              </Typography>
              <Typography variant="body2">
                Visit the following website to your positive accounts
              </Typography>
              <List
                dense
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                <a
                  href="https://restorescorepro.net/add-tradelines"
                  target="_blank"
                  onClick={() => setCheckedAccount(true)}
                  rel="noreferrer"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <ListItem
                    secondaryAction={
                      <Checkbox
                        checked={checkedAccount}
                        onChange={onChange}
                        edge="end"
                      />
                    }
                    disablePadding
                  >
                    <ListItemButton>
                      <ListItemText
                        primary={`https://restorescorepro.net/add-tradelines`}
                      />
                    </ListItemButton>
                  </ListItem>
                </a>
                {links.map((link) => (
                  <Account1 link={link} />
                ))}
              </List>
            </Box>
            {/* <Button
              variant="contained"
              sx={{
                textTransform: "none",
              }}
            >
              Submit all
            </Button> */}
          </Box>
        </DialogContent>
        {/*  <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
};

export default forwardRef(PositiveAccount);
