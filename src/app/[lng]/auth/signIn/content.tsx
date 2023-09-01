'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
// import useMsal from "../../hooks/useMsal";
// import { AccountInfo } from "@azure/msal-browser";
import { Box, Button, Card, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import logo from '../../../../../public/next.svg';
import { useTranslation } from '@/app/i18n/client';
import { Session } from 'inspector';

interface Props {
  params: {
    lng: string;
  };
}

const ContentSignIn: React.FC<Props> = ({ params: { lng } }) => {
  const router = useRouter();
  const { t } =  useTranslation(lng,"signin");

  return (
    <>
      <Grid container>
        {/* <Grid
          item
          xs={0}
          md={6}
          lg={6}
          height={"100vh"}
          sx={{
            backgroundImage: 'url("/pig3.jpg")',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></Grid> */}
        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          justifyContent={'center'}
          alignItems={'center'}
          display={'flex'}
          height={'100vh'}
        //   sx={{
        //     background: 'linear-gradient(#074E9F, #19408b 60%, #172f73)'
        //   }}
        >
          <Grid rowSpacing={2} textAlign={'center'}>
            <Card
              sx={{ padding: '50px', borderRadius: '1rem', width: '380px' }}
            >
              <Grid
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Image
                  src={logo}
                  alt="axons logo"
                  style={{
                    width: '100%',
                    height: '100%',
                    maxWidth: '125px'
                  }}
                />
              </Grid>

              <Grid>
                <Typography fontSize={'32px'} color="#074E9F">
                  App tool
                </Typography>
              </Grid>
              <Grid>
                <Typography color="#074E9F">
                  {t('title-sign-in')}
                </Typography>
                {/* <Grid paddingY={'2rem'}>
                  <SelectOrgCode />
                </Grid> */}
                {/* <FormControl variant="outlined" size="small">
                  <Select fullWidth type="string" sx={{ mt: 10 }}>
                    {dataOrgCode?.GetOrganizationListByCountryResult.map(
                      (item, i) => (
                        <MenuItem key={i} value={item.OrgCode}>
                          {item.OrgNameLoc} : {"(" + item.OrgCode + ")"}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl> */}
              </Grid>
              {/* <Button
                variant="contained"
                fullWidth
                sx={{ backgroundColor: "#074E9F" }}
                onClick={() => signIn("azure-ad", { callbackUrl })}
              >
                เข้าสู่ระบบ
              </Button> */}
              <Box>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ backgroundColor: '#074E9F' }}
                  onClick={async () => {
                    // const result = await signIn('azure-ad'', {
                    //   redirect: false
                    // });
                    // if (result?.error) {
                    //   console.log(result?.error);
                    //   return false;
                    // } else {
                    //  console.log(result)
                    // }

                    const result = await signIn('azure-ad',{
                        redirect: false
                    });
                    if(result?.error){
                        alert('error')
                        return false
                    }else{
                       router.replace('/client')
                    }
                  }}
                >
                  เข้าสู่ระบบ
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ContentSignIn;
