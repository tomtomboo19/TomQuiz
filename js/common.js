
(function ($) {
    'use strict';

    //合計問題数
    let $questionTotalNum = 10;

    /* -----------------------------------------------
    県庁所在地クイズ
    -------------------------------------------------- */
    const prefecturalCapital = [
        {
        id: "01",
        question: "の身長は？",
        answer01: "181cm",
        answer02: "180cm",
        answer03: "179cm",
        answer04: "178cm",
        difficulty: "easy"
        },
        {
        id: "02",
        question: "の好きな食べ物は？",
        answer01: "ラーメン",
        answer02: "寿司",
        answer03: "焼肉",
        answer04: "パスタ",
        difficulty: "easy"
        },
        {
        id: "03",
        question: "の好きなスポーツは？",
        answer01: "バスケ",
        answer02: "サッカー",
        answer03: "野球",
        answer04: "テニス",
        difficulty: "easy"
        },
        {
        id: "04",
        question: "の好きな漫画は？",
        answer01: "ワンピース",
        answer02: "スラムダンク",
        answer03: "キングダム",
        answer04: "ナルト",
        difficulty: "easy"
        },
        {
        id: "05",
        question: "の好きな教科は？",
        answer01: "化学",
        answer02: "数学",
        answer03: "英語",
        answer04: "歴史",
        difficulty: "easy"
        },
        {
        id: "06",
        question: "の出身中学は？",
        answer01: "小平五中",
        answer02: "小平六中",
        answer03: "小平七中",
        answer04: "小平三中",
        difficulty: "easy"
        },
        {
        id: "07",
        question: "の車のナンバーのひらがなは？",
        answer01: "え",
        answer02: "か",
        answer03: "の",
        answer04: "わ",
        difficulty: "hard"
        },
        {
        id: "08",
        question: "の吸ってるタバコのタール数は？",
        answer01: "17mg",
        answer02: "18mg",
        answer03: "19mg",
        answer04: "12mg",
        difficulty: "medium"
        },
        {
        id: "09",
        question: "の使ってるiPhoneは？",
        answer01: "14Pro",
        answer02: "13",
        answer03: "14",
        answer04: "13Pro",
        difficulty: "easy"
        },
        {
        id: "10",
        question: "の足のサイズは？",
        answer01: "29cm",
        answer02: "28cm",
        answer03: "28.5cm",
        answer04: "27cm",
        difficulty: "easy"
        },
        
    ];

    function filterQuestionsByDifficulty(difficulty) {
        // 'all' を選択した場合は全ての問題を返す
        if (difficulty === 'all') {
            return prefecturalCapital;
        }
        // 特定の難易度に基づいて問題をフィルタリング
        return prefecturalCapital.filter(item => item.difficulty === difficulty);
    }

    //質問をランダムにする
    function shuffleQuiz(array) {
        for (let i = (array.length - 1); 0 < i; i--) {
        let random = Math.floor(Math.random() * (i + 1));
        let selected = array[i];
        array[i] = array[random];
        array[random] = selected;
        }
        return array;
    }
    let quizId = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];
    shuffleQuiz(quizId);

    //現在の質問数
    let $currentNum = 0;

    //得点
    let $pointPerCorrect = 10;

    let questionObject = (function () {
        let Obj = function ($target) {

        //質問の番号
        this.$questionNumber = $target.find('.quiz-question-number');

        //質問文
        this.$questionName = $target.find('.quiz-question');

        //選択肢ボタン
        this.$questionButton = $target.find('.quiz-button');
        this.$button01 = $target.find('.button01');
        this.$button02 = $target.find('.button02');
        this.$button03 = $target.find('.button03');
        this.$button04 = $target.find('.button04');

        //選択肢のテキスト
        this.$answer01 = $target.find('.quiz-text01');
        this.$answer02 = $target.find('.quiz-text02');
        this.$answer03 = $target.find('.quiz-text03');
        this.$answer04 = $target.find('.quiz-text04');

        //score
        this.$score = $target.find('.score-wrap .score');

        this.init();
        };
        Obj.prototype = {
        //初回設定
        init: function () {
          //イベント登録
            this.event();
        },
        event: function () {
            let _this = this;
            let score = 0;

          //ウインドウ読み込み時
            $(window).on('load', function () {
            //value取得
            let value = quizId[$currentNum]; //最初は0（1番目）
            //次の質問を取得
            let nextQuestion = _this.searchQuestion(value);
            //次の質問に切り替える
            _this.changeQuestion(nextQuestion);
            //回答のシャッフル
            _this.shuffleAnswer($('.quiz-answer'));
            });

          //button クリック
            this.$questionButton.on("click", function () {

            if ($(this).hasClass('button01')) {
                $(this).parents('.quiz-answer').addClass('is-correct');
                score = score + $pointPerCorrect;
            } else {
                $(this).parents('.quiz-answer').addClass('is-incorrect');
            }

            $(this).addClass('is-checked');

            if ($currentNum + 1 == $questionTotalNum) {
                setTimeout(function () {
                $('.finish').addClass('is-show');
                $('.score-wrap .score').text(score);
                }, 1000);
            } else {
                setTimeout(function () {
                //現在の数字の更新
                $currentNum = $currentNum + 1;

                //次の質問番号を取得
                let value = quizId[$currentNum];

                //次の質問を取得
                let nextQuestion = _this.searchQuestion(value);

                //次の質問に切り替える
                _this.changeQuestion(nextQuestion);

                //クラスを取る
                _this.$questionButton.removeClass('is-checked');
                $('.quiz-answer').removeClass('is-correct').removeClass('is-incorrect');

                //回答のシャッフル
                _this.shuffleAnswer($('.quiz-answer'));

                }, 1000);
            }
            return false;
            });
        },
        searchQuestion: function (questionId) {
            let nextQuestion = null;
            prefecturalCapital.forEach(function (item) {
            if (item.id == questionId) {
                nextQuestion = item;
            }
            });
            return nextQuestion;
        },
        changeQuestion: function (nextQuestion) {
            let _this = this;

          //質問文の入れ替え
            _this.$questionName.text('佐伯斗夢' + nextQuestion.question);

          //質問番号を1つ増やす
            let numPlusOne = $currentNum + 1;
            _this.$questionNumber.text('質問' + numPlusOne);

          //選択肢のテキストの入れ替え
            _this.$answer01.text(nextQuestion.answer01);
            _this.$answer02.text(nextQuestion.answer02);
            _this.$answer03.text(nextQuestion.answer03);
            _this.$answer04.text(nextQuestion.answer04);
        },
        shuffleAnswer: function (container) {
            let content = container.find("> *");
            let total = content.length;
            content.each(function () {
            content.eq(Math.floor(Math.random() * total)).prependTo(container);
            });
        },
    };
        return Obj;
    })();

    let quiz = $('.quiz');
    if (quiz[0]) {
        let queInstance = new questionObject(quiz);
    }

    $(document).ready(function() {
        $('#start-quiz').click(function() {
            let selectedDifficulty = $('#difficulty-select').val();
            let filteredQuestions = filterQuestionsByDifficulty(selectedDifficulty);
            quizId = filteredQuestions.map(q => q.id);
            shuffleQuiz(quizId);
            $currentNum = 0;
            // let queInstance = new questionObject($('.quiz'));
            // let firstQuestion = queInstance.searchQuestion(quizId[$currentNum]);
            // queInstance.changeQuestion(firstQuestion);
            $('.difficulty-selection').hide();
            $('.quiz').show();
        });
    });


})(jQuery);
