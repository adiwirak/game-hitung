const initialState = {
  nama: '',
  email: '',
  phone_numb: "",
  ippemain: "",
  BykSoal:0, BykBenar:0,
  sdh_daftar: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'OnLogin':
      return Object.assign({}, state, action.payload);
    case 'USER_RESET':
      return {...state, sdh_daftar: false} ;
    case 'USER_UBAH_SCORE':
      return {...state, 
        BykSoal: action.payload.BykSoal,
        BykBenar: action.payload.BykBenar,} ;
    default:
      return state;
  }
};
