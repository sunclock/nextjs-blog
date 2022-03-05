import styles from './layout.module.css'
import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children }) {
	return (
		<div className={styles.container}>
			<Navbar />
			<main>{children}</main>
			<Footer />
		</div>
	)
}
