export default defineContentScript({
  matches: ['https://www.cmechina.net/*'],
  async main(ctx) {
    await injectScript("/injected.js", {
      keepInDom: true,
    });
    // 判单列表是否学习
    const hasPass = document.querySelectorAll('.kstg').length > 0;
    if (hasPass) {
      const wxxElement = document.querySelector<HTMLElement>('.wxx');
      if (wxxElement) {
        const parentElement = wxxElement.parentNode as HTMLElement;
        parentElement?.click();
      }
    }
    // 判断如果答错，记录错误答案
    const errAnswer = document.querySelector('.show_exam_text')
    if (errAnswer) {
      const ansultResult: string[] = []
      document.querySelectorAll(".answer_list").forEach(item => {
        const result = item.querySelector('h3')?.className;
        if (result) {
          ansultResult.push(result);
        }
      });
      localStorage.setItem('ansultResult', JSON.stringify(ansultResult));
      window.history.back();
    }
    // 判断返回继续答题
    const exam_list = document.querySelector('.exam_list');
    if (exam_list) {
      const result = JSON.parse(localStorage.getItem('ansultResult') as string);
      localStorage.removeItem('ansultResult');
      if (result === null) {
        exam_list.querySelectorAll('li').forEach(itemLi => {
          (itemLi.querySelector('p input') as HTMLElement)?.click();
        });
      } else {
        exam_list.querySelectorAll("li").forEach((itemLi, index) => {
          // 判断input是否选中
          const allInput = itemLi.querySelectorAll<HTMLInputElement>("p input");
          if (result[index] === "cuo") {
            let nextAnswerIndex = 0;
            allInput.forEach((itemInput, inputIndex) => {
              if (itemInput.checked) {
                nextAnswerIndex = inputIndex + 1;
              }
            });
            allInput[nextAnswerIndex].click();
          }
        });
      }
      document.querySelector<HTMLElement>("#tjkj")?.click();
    }
    // 判断是否考试通过
    const exam_pass = document.querySelector('.show_exam_btns');
    if (exam_pass) {
      exam_pass.querySelector('a')?.click();
    }
  },
});
