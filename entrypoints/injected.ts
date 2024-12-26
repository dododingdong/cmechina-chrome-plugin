export default defineUnlistedScript(() => {
  if (window.playEnd) {
    window.playEnd();
    setTimeout(() => {
      if (window.gotoExam) window.gotoExam();
    }, 1000);
  }
});
