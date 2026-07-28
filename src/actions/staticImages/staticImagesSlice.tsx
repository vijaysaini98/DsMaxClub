import { AppDispatch } from '@redux/store';
import { createSlice } from '@reduxjs/toolkit';
import { API } from '@services/appClient';

const initialState = {
  images: {},      // name → url map (matches your imageMap)
  loaded: false,
};

const staticImagesSlice = createSlice({
  name: 'staticImages',
  initialState,
  reducers: {
    setStaticImages: (state, action) => {
        console.log(action,'action==>');
        
      state.images = action.payload;
    },
    setLoading: (state, action) => {
      state.loaded = action.payload;
    },
    clearStaticImages: (state) => {
      state.images = {};
    },
  },
});

export const { setStaticImages, setLoading, clearStaticImages } =
  staticImagesSlice.actions;

export const imageReducer = staticImagesSlice.reducer;


export const getStaticImages =
  (onSuccess?: any) => async (dispatch: AppDispatch, getState: any) => {
    try {
      // GUARD: skip API if images already loaded (from persisted store)
      const { imagesSlice } = getState();
      if (
        imagesSlice?.images &&
        Object.keys(imagesSlice.images).length > 0
      ) {
        console.log('Static images already cached — skipping API call');
        onSuccess && onSuccess();
        return;
      }

      dispatch(setLoading(true));

      const response = await API.authApi.static_images();

      console.log(response?.data, 'response of static images');

      if (response?.status === 200) {
        const imageMap = response.data.images.reduce(
          (acc: any, item: any) => {
            acc[item.name] = item.url;
            return acc;
          },
          {},
        );

        dispatch(setStaticImages(imageMap));

        onSuccess && onSuccess();
        return;
      } else {
        throw new Error('No response data received from backend.');
      }
    } catch (e: any) {
      console.log('Static Images Error', e?.response?.data || e?.message);
    } finally {
    //   dispatch(setLoading(false));
    }
  };