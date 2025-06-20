import Tap from "../../../shared/ui/Tap";
import { useTranslation } from "react-i18next";

const Taps = ({ taps }) => {
    const { t } = useTranslation();
    return (
        <div
            className={`flex  flex-wrap items-start justify-between w-full gap-3`}
        >
            {/* taps */}
            {taps?.map((item) => {
                return (
                    <Tap
                        imgPath={item.imgPath}
                        bgColor={item.bgColor}
                        textColor={item.textColor}
                        number={item.number}
                        name={t(item.name)}
                    />
                );
            })}
        </div>
    );
};

export default Taps;
