import { Helmet } from "react-helmet-async"
import React from 'react';

export default function MetaData({title}){
    return(
        <Helmet>
            <title>
                {`${title   }- kumarancart`}
            </title>
        </Helmet>

    )

}