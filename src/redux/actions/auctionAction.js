import { client } from "../../apollo/client";
import * as Mutation from './../../apollo/graghqls/mutations/Auction';
import { showFailAlarm, showSuccessAlarm } from "../../components/admin/AlarmModal";

export const create_Auction = createData => async dispatch => {
    try {
        await client.mutate({
            mutation: Mutation.CREATE_AUCTION,
            variables: { ...createData }
        });
        showSuccessAlarm('Auction created successfully');
    } catch(err) {
        console.log(err.message);
        showFailAlarm('Action failed', 'Ops! Something went wrong!');
    }
};