import StatCard from "../../components/cards/StatCard";

const Dashboard = () => {

    return (

        <>

            <div className="mb-5">

                <h2 className="text-white">

                    Welcome Back 👋

                </h2>

                <p className="text-secondary">

                    Here's your workspace overview.

                </p>

            </div>

            <div className="row g-4">

                <div className="col-lg-3">

                    <StatCard

                        title="Projects"

                        value="12"

                        subtitle="+2 This Week"

                        icon="bi-folder2-open"

                        color="#6366F1"

                    />

                </div>

                <div className="col-lg-3">

                    <StatCard

                        title="Tasks"

                        value="86"

                        subtitle="+18 Today"

                        icon="bi-list-task"

                        color="#10B981"

                    />

                </div>

                <div className="col-lg-3">

                    <StatCard

                        title="Teams"

                        value="6"

                        subtitle="Growing"

                        icon="bi-people"

                        color="#F59E0B"

                    />

                </div>

                <div className="col-lg-3">

                    <StatCard

                        title="Bugs"

                        value="14"

                        subtitle="-5 Fixed"

                        icon="bi-bug"

                        color="#EF4444"

                    />

                </div>

            </div>

        </>

    );

};

export default Dashboard;