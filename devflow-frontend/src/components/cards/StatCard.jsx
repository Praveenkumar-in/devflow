import { motion } from "framer-motion";

const StatCard = ({
    title,
    value,
    icon,
    color,
    subtitle
}) => {

    return (

        <motion.div

            whileHover={{
                y: -8,
                scale: 1.03
            }}

            transition={{
                duration: .3
            }}

            className="stat-card"

        >

            <div className="d-flex justify-content-between">

                <div>

                    <p className="text-secondary mb-2">

                        {title}

                    </p>

                    <h2 className="fw-bold text-white">

                        {value}

                    </h2>

                    <small className="text-success">

                        {subtitle}

                    </small>

                </div>

                <div
                    className="icon-box"
                    style={{
                        background: color
                    }}
                >

                    <i className={`bi ${icon}`}></i>

                </div>

            </div>

        </motion.div>

    );

};

export default StatCard;