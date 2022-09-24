import './App.css';
import { Routes, Route } from 'react-router-dom';
import AuthenticationPage from './Pages/Authentication';
import TodoPage from './Pages/Todo';

export default function App() {
	return (
		<>
			<Routes>
				<Route path="/authentication" element={<AuthenticationPage />} />
				<Route path='/todo' element={<TodoPage />}/>
			</Routes>
		</>
	);
}
