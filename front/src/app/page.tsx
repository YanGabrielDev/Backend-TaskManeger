'use client'
import styles from './page.module.css';

export default function Home() {
  return (
    <div style={{ background: 'white', height: '100vh', width: '100%', display: 'flex' }}>
      <div
        onDrop={(e) => {
          const data = e.dataTransfer.getData('opa');
          console.log(data);
          e.preventDefault();
        }}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={(e) => {
          e.preventDefault();
          console.log('leave');
        }}
        style={{ width: '50%', height: '100vh', background: 'blue' }}
      ></div>
      {/* <div
        onDrop={(e) => {
          e.preventDefault();
        }}
        style={{ width: '50%', height: '100vh', background: 'orange' }}
      ></div> */}
      <div
        id="drag1"
        className={styles.container}
        draggable={true}
        onDragStart={(e) => {
          e.dataTransfer.setData("Opa", 'Hello');

        }}
        // onDragStart={(e) => {
        //   e.preventDefault();

        //   e.dataTransfer.setData('opa', 'Hello');
        // }}
      >
        <h1>asmfa</h1>
      </div>
    </div>
  );
}
