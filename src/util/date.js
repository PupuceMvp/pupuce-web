import {formatDistanceToNow, parseISO} from "date-fns";


const convertToRelativeDate = (date) => {
    try{
        console.log(date)

        return formatDistanceToNow(
            parseISO(date),
            {
                addSuffix: false,
                includeSeconds: true,
            }
        )
    } catch (error) {
        console.log(error)
        return null;
    }
}


export default convertToRelativeDate;
