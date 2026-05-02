// chatbot.ts のファイルの中身
import { LAppDelegate } from './lappdelegate'; // LAppDelegateをインポート
import { LAppModel } from './lappmodel'; // LAppModelをインポート！
import * as LAppDefine from './lappdefine';


// ☆ここに「export」と「function initializeChatbot() {」を追加するだけ！☆
export function initializeChatbot() {
    const userInput = document.getElementById('user-input') as HTMLInputElement;
    const sendButton = document.getElementById('send-button') as HTMLButtonElement;
    const messagesDiv = document.getElementById('messages') as HTMLDivElement;
    

    if (!userInput || !sendButton || !messagesDiv) {
      console.error('チャットボットの部品が見つかりません。HTMLを確認してね。');
      return;
    }


    function getPrimaryLive2DModel(): LAppModel | null {
    const appDelegate = LAppDelegate.getInstance();
    if (!appDelegate) return null;

    const subDelegate = appDelegate.getPrimarySubdelegate();
    if (!subDelegate) return null;

    const live2DManager = subDelegate.getLive2DManager();
    if (!live2DManager) return null;

    // LAppLive2DManagerは内部でLAppModelのcsmVectorを持っています。
    // サンプルでは通常0番目のモデルを操作するので、at(0)で取得します。
    return live2DManager._models.at(0) || null; // _modelsはprivateではないので直接アクセス可能
    // あるいは live2DManager に getPrimaryModel() のような public メソッドを追加するのもあり
}


    sendButton.addEventListener('click', () => {
      const message = userInput.value;
      if (message.trim() === '') return;

      messagesDiv.innerHTML += `<p><strong>あなた:</strong> ${message}</p>`;
      userInput.value = '';
      messagesDiv.scrollTop = messagesDiv.scrollHeight;

      setTimeout(() => {
        let botResponse: string;

          if (message.includes('こんにちは')) {
            const model = getPrimaryLive2DModel();
            if (model){
              model.startMotion('Talk', 7, LAppDefine.PriorityNormal);
              botResponse = 'こんにちは！'; 
            }
          } 
          else if (message.includes('名前')) { // もし「名前」という言葉が含まれていたら
            const model = getPrimaryLive2DModel();
            if (model){
              model.startMotion('Talk', 5, LAppDefine.PriorityNormal);
              botResponse = '私の名前は桃瀬ひよりだよ！'; 
            }
          } 
          else if (message.includes('かわいい！')) { // もし「ありがとう」という言葉が含まれていたら
            const model = getPrimaryLive2DModel();
            if (model){
              model.startMotion('Talk', 3, LAppDefine.PriorityNormal);
              botResponse = 'そうかな……ありがとう'; 
            }
          }
          else {
            const model = getPrimaryLive2DModel();
            if (model){
              model.startMotion('Talk', 7, LAppDefine.PriorityNormal);
              botResponse = `「${message}」ってどういう意味？もう一回教えて？`;
            }           
          }
        messagesDiv.innerHTML += `<p><strong>ボット:</strong> ${botResponse}</p>`;
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        // ★Live2Dとの連携はここに書く★
      }, 1000);
    });

    

    
}