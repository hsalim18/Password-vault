import styles from '../style';
import Button from './Button';

const GetStartedCard = () => (
  <section
    className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
    <div className='flex-1 flex flex-col'>
      <h2 className={styles.heading2}> Start saving your passwords now!</h2>
    </div>

    <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10 z-50`}>
      <Button />
    </div>
  </section>
);

export default GetStartedCard;
