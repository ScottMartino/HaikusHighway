import { useContext, useEffect } from "react";
import { AppContext } from "./AppContextProvider";

const DisplayHaiku = () => {
    const {
        syllableLineOne, setSyllableLineOne,
        lineOne, setLineOne,
        completedHaiku, setCompletedHaiku,
    } = useContext(AppContext);

    useEffect(() => {
        /* when our first line is complete */
        if (completedHaiku.length === 0 && syllableLineOne === 0) {
            setCompletedHaiku([lineOne]);
            setLineOne('');
            setSyllableLineOne(7);
            /* when our second line is complete */
        } else if (completedHaiku.length === 1 && syllableLineOne === 0) {
            const twoLines = [...completedHaiku];
            twoLines.push(lineOne);
            setCompletedHaiku(twoLines);
            setLineOne('');
            setSyllableLineOne(5)
            /* when our third line is complete */
        } else if (completedHaiku.length === 2 && syllableLineOne === 0) {
            const threeLines = [...completedHaiku];
            threeLines.push(lineOne);
            setCompletedHaiku(threeLines);
            setLineOne('')
        }
    }, [completedHaiku, setLineOne, setSyllableLineOne, syllableLineOne, lineOne, setCompletedHaiku])

    return (
        <ul className='displayHaikuContainer'>
            {completedHaiku.map((line, index) => {
                return (
                    <li key={`line-${index}`}>
                        <h2>{line}</h2>
                    </li>
                )
            })
            }
        </ul>
    )
}

export default DisplayHaiku