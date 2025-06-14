// App.js
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import CapsuleContract from "/home/ubuntu/grading/frontend/src/contracts/Capsule.json";
import "./App.css";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [rating, setRating] = useState(0);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);

  useEffect(() => {
    const init = async () => {
      const prov = new ethers.providers.Web3Provider(window.ethereum);
      const sign = prov.getSigner();
      const accs = await prov.send("eth_requestAccounts", []);
      setAccount(accs[0]);
      setProvider(prov);
      setSigner(sign);
      const cont = new ethers.Contract(CONTRACT_ADDRESS, CapsuleContract.abi, sign);
      setContract(cont);
    };
    init();
  }, []);

  const handleCheckIn = async () => {
    if (!contract || !signer) return;
    const tx = await contract.checkIn({ value: ethers.utils.parseEther("1.0") });
    await tx.wait();
    setHasCheckedIn(true);
  };

  const handleRating = async (stars) => {
    if (!contract || !signer) return;
    const tx = await contract.rate(stars);
    await tx.wait();
    alert("评分成功");
    setHasCheckedIn(false);
    setRating(0);
  };

  return (
    <div className="container">
       <div className="card">  
        {/* 🖼️ 加入图片 */}
        <img
          src="./PIC.jpg" 
          lt="胶囊仓"
          className="capsule-image"
        />

        <h1>胶囊仓入住系统</h1>
        <p>当前账号: {account}</p>
        {!hasCheckedIn ? (
          <button onClick={handleCheckIn}>入住 (支付1 vETH)</button>
        ) : (
          <div className="rating-box">
            <p>请为卫生情况评分:</p>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={rating >= star ? "star active" : "star"}
                  onClick={() => {
                    setRating(star);
                    handleRating(star);
                  }}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        )}
      </div>  
    </div>
  );
}

export default App;
