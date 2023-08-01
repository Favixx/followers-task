import { Navigate, Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home/Home'
import { Layout } from './Layout/Layout'
import Tweets from '../pages/Tweets/Tweets'

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/tweets" element={<Tweets />} />
        <Route path="*" element={<Navigate to={'/'} />} />
      </Route>
    </Routes>
  )
}

