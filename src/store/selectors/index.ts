import { RootState } from "hook/useSelector";

export const selectProducts = ({ productSlice }: RootState) => productSlice;
