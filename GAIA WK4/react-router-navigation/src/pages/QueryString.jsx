import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const useQueryParams = () => {
    const location = useLocation();
    return useMemo(() => {
        const params = new URLSearchParams(location.search);
        const result = {};
        for (const [key, value] of params.entries()) {
            result[key] = value;
        }
        return result;
    }, [location.search]);
};

function QueryString() {
    const useQueryParams = useQueryParams();
    const id = useQueryParams.id;
    const category = useQueryParams.category || "category";

    return (
        <>
        ID: {id} Category: {category}
        </>
    );
}

export default QueryString; 