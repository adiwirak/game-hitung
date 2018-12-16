export function ubahSemuaTtgUser(objData) {
    return {
      type: 'OnLogin',
      payload: objData,
    };
  };

export function ResetUSERApp() {
    return {type: 'USER_RESET', payload:null};
  };
  
export function OnNextSoal(vBykSoal,vBykBenar) {
    return {type: 'USER_UBAH_SCORE', 
      payload:{
        BykSoal: vBykSoal,
        BykBenar: vBykBenar,
    }};
  };