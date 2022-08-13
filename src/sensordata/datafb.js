import { db } from "sensordata/configfb";
import { useEffect } from "react";
import  { ref, onValue } from "firebase/database";



  function useFirebaseData() {
    const datasuhu = ref(db, 'Sensordat');
    

    useEffect (() => {
        const getDataFromAPI = async () => {
            const inidata = await onValue(datasuhu, (snapshot) => {
                const nilaisuhu = snapshot.val();
                console.log(nilaisuhu);
                return nilaisuhu;
              });
              console.log('get Data==>',inidata);
        }
        getDataFromAPI();
    }, [])

  };

  export default useFirebaseData;
  

 // export const getDataFromAPI =