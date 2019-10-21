export default {
  state: {
    list: [],
  },
  mutations: {
    add(state,song) {
      const list = state.list;
      if (list.length > 0) {
        const index = list.findIndex((item, index) => {
          return item.rid === song.rid;
        });
        if (index > -1) {
          return;
          // state.list.unshift(song);
        }
      }
      state.list.unshift(song);
    },
    // playAll(state, songObj) {
    //   const 
    // },
    del(state, song) {
      const list = state.list;
      if (list.length > 0) {
        const index = list.findIndex((item, index) => {
          return item.rid === song.rid;
        });
        if (index > -1) {
          state.list.splice(song, 1);
          return;
        }
      }
      state.list.unshift(song);
    },
    clear(state){
      state.list = [];
    }
  }
}