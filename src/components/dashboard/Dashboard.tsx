import DashboardAside from '@/components/dashboard/DashboardAside'
import { DashboardNav } from '@/components/dashboard/DashboardNav'

import classes from './Dashboard.module.css'

const Dashboard = ({ children }) => (
  <div className={classes.dashboard}>{children}</div>
)

const Body = ({ children }) => <main className={classes.body}>{children}</main>

Dashboard.Nav = DashboardNav
Dashboard.Aside = DashboardAside
Dashboard.Body = Body
export default Dashboard
