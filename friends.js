/**   
<div class="friend-show">
    <div class="friend-show-member">
        <div class="wrapper-bgi">
            <img
                src="./img/Friend/bgi-member1.jpg   "
                class="bgi-member"
                alt=""
            />
        </div>
        <div class="info-member">
            <div class="info-member-left">
                <img
                    src="./img/Home/member-1.png"
                    alt=""
                    class="info-member-img"
                />
                <div class="info-member-name">
                    <h2>Alison Mina</h2>
                    <p>5 bạn chung</p>
                    <div class="list-friends-common">
                        <img
                            src="./img/Home/member-2.png"
                            alt=""
                            class="list-friends-common-imgs"
                        />
                        <img
                            src="./img/Home/member-3.png"
                            alt=""
                            class="list-friends-common-imgs"
                        />
                        <img
                            src="./img/Home/member-4.png"
                            alt=""
                            class="list-friends-common-imgs"
                        />
                        <img
                            src="./img/Home/member-5.png"
                            alt=""
                            class="list-friends-common-imgs"
                        />
                    </div>
                </div>
            </div>
            <div class="info-member-right">
                <div class="friend-control">
                    <div
                        class="friend-control-item friend-control-friend"
                    >
                        <img
                            src="./img/Friend/approve.png"
                            alt=""
                        />
                        <span>Bạn bè</span>
                    </div>
                    <div
                        class="friend-control-item friend-control-mess"
                    >
                        <img
                            src="./img/Friend/messenger.png"
                            alt=""
                        />
                        <span>Tin nhắn</span>
                    </div>
                    <div
                        class="friend-control-item friend-control-down"
                    >
                        <i class="fa-solid fa-angle-down"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


*/

let friendShow = document.querySelector("#friend-show");
let listMember = [...document.querySelectorAll(".item-friend")];
let generateMember = function () {
    listMember.forEach(function (item) {
        if (item.classList.contains("active")) {
            const search = listFriend.find(function (x) {
                return x.id === item.id;
            });

            if (search) {
                const { img, imgBgi, number, name } = search;
                friendShow.innerHTML = `
                <div class="friend-show-member">
                  <div class="wrapper-bgi">
                    <img src="${imgBgi}" class="bgi-member" alt="" />
                  </div>
                  <div class="info-member">
                    <div class="info-member-left">
                      <img src="${img}" alt="" class="info-member-img" />
                      <div class="info-member-name">
                        <h2>${name}</h2>
                        <p>${number} bạn chung</p>
                        <div class="list-friends-common">
                          <img src="./img/Home/member-2.png" alt="" class="list-friends-common-imgs" />
                          <img src="./img/Home/member-3.png" alt="" class="list-friends-common-imgs" />
                          <img src="./img/Home/member-4.png" alt="" class="list-friends-common-imgs" />
                          <img src="./img/Home/member-5.png" alt="" class="list-friends-common-imgs" />
                        </div>
                      </div>
                    </div>
                    <div class="info-member-right">
                      <div class="friend-control">
                        <div class="friend-control-item friend-control-friend">
                          <img src="./img/Friend/approve.png" alt="" />
                          <span>Bạn bè</span>
                        </div>
                        <div class="friend-control-item friend-control-mess">
                          <img src="./img/Friend/messenger.png" alt="" />
                          <span>Tin nhắn</span>
                        </div>
                        <div class="friend-control-item friend-control-down">
                          <i class="fa-solid fa-angle-down"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            } else {
                // Xử lý khi không tìm thấy phần tử phù hợp
                friendShow.innerHTML = "Không tìm thấy phần tử phù hợp";
            }
        }
    });
};
generateMember();

listMember.forEach(function (item) {
    item.addEventListener("click", function (e) {
        listMember.forEach(function (x) {
            x.classList.remove("active");
        });
        item.classList.add("active");
        generateMember();
    });
});
