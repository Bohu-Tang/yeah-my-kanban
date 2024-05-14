import {css} from '@emotion/react';

const layoutStyles = css`
color: red;
`

export default function Layout({children}) {
    return (
        <div css={layoutStyles}>
            <children/>
        </div>
    );
}