import classes from './Dashboard.module.css';
import History from './History';
import InforBoard from './InforBoard';

const Dashboard = () => {
  return (
    <div className={classes.container}>
      <h3>Dashboard</h3>
      <InforBoard />
      <History />
    </div>
  );
};

export default Dashboard;
