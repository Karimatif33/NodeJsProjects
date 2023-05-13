import axios from "axios";
import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { Spinner, Box } from "@chakra-ui/react";
interface CustomWindow extends Window {
  opera?: any;
}

const userAgent = navigator.userAgent || navigator.vendor || (window as CustomWindow).opera;

const SERVER_ENDPOINT =
  process.env.REACT_APP_SERVER_ENDPOINT || "http://localhost:4000";

function HandleRedirectContainer() {
  const [destination, setDestination] = useState<null | string>(null);
  const [error, setError] = useState();

  const {
    params: { shortId },
  } = useRouteMatch<{
    shortId: string;
  }>();

  useEffect(() => {
    async function getData() {
      return axios
        .get(`${SERVER_ENDPOINT}/api/url/${shortId}`)
        .then((res) => setDestination('res.data.destination'))
        .catch((error) => {
          setError(error.message);
        });
    }
    getData();
  }, [shortId]);

  useEffect(() => {
    if (destination) {
      window.location.replace(destination);
    }
    
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      window.location.href = "https://itunes.apple.com/us/app";  
      console.log("11");
    }
    
    if (/android/i.test(userAgent)) {
      window.location.href = "https://play.google.com/store/apps";
      console.log("12");
    
    }
    
    



  }, [destination]);

  if (!destination && !error) {
    return (
      <Box
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner />
      </Box>
    );
  }

  return <p>{error && JSON.stringify(error)}</p>;
}

export default HandleRedirectContainer;
