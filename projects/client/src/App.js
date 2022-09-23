import './App.css';
import { Routes, Route } from 'react-router-dom';
import AuthenticationPage from './Pages/Authentication';

export default function App() {
	return (
		<>
			<Routes>
				<Route path="/authentication" element={<AuthenticationPage />} />
			</Routes>
		</>
	);
}
