import React, { useCallback, useMemo, Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";

import styles from "./style.less";

function Dashboard() {
  const links = useMemo(
    () => [
      { to: "/demo", text: "Demo" },
      { to: "/redux-demo", text: "Redux Demo" },
    ],
    []
  );

  const renderActive = useCallback((params: { isActive: boolean }) => {
    return params.isActive ? styles.active : "";
  }, []);

  return (
    <section className={styles.container}>
      <header className={styles.header}>header</header>
      <section className={styles.content}>
        <aside className={styles.aside}>
          {links.map((item) => (
            <NavLink to={item.to} key={item.to} className={renderActive}>
              {item.text}
            </NavLink>
          ))}
        </aside>
        <main className={styles["sub-content"]}>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </main>
        <div className={styles.name}></div>
      </section>
    </section>
  );
}

export default Dashboard;
