import { useEffect } from 'react';
import './App.css';
import { useTelegram } from './hooks/useTelegram';
import Header from './components/header/header';
import { Route,Routes } from 'react-router-dom';
import ServiceList from './components/ServiceList/ServiceList';
import Form from './components/Form/Form';

function App() {

  const {onToggleButton, tg} = useTelegram(); 

  useEffect(() => {
    tg.ready();
  }, [])


  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route index element = {<ServiceList/>}/>
        <Route path = {'form'} element = {<Form/>}/>
      </Routes>
    </div>
  );
}

export default App;
