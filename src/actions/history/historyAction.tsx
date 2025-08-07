import { API } from '@services/appClient';
import { AppDispatch } from '@redux/store';
import Toast from "react-native-simple-toast";
import { setLoading, setVendorHistory } from './historySlice';

export const getVendorHistoryList =
    (limit?: any, onSucess?: any) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading(true));
            const response = await API.historyApi.vendor_history_list(limit);
            if (response?.status == 200) {
                dispatch(setVendorHistory(response?.data))
                return;
            } else {
                throw new Error('No response data received from backend.');
            }
        } catch (e: any) {
            console.log("e", e);

            Toast.show(e?.response?.data?.message, Toast.LONG);
        } finally {
            dispatch(setLoading(false))
        }
    };
