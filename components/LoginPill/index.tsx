import { FunctionComponent } from "react";
import Link from "next/link";
import styles from "./LoginPill.module.scss";


interface Props {
}


const LoginPill: FunctionComponent = (props: Props) => (
	<Link href="/login">
		<a id={styles.login}>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" id={styles.icon}>
			<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
			<circle cx="12" cy="7" r="4" />
		</svg>
		Login / Signup
		</a>
	</Link>
);


export default LoginPill;