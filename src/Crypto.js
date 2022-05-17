import "bn.js"
import BN from "bn.js"

// PHex is P for ElGamal
const PHex = "87A8E61DB4B6663CFFBBD19C651959998CEEF608660DD0F25D2CEED4435E3B00E00DF8F1D61957D4FAF7DF4561B2AA3016C3D91134096FAA3BF4296D830E9A7C209E0C6497517ABD5A8A9D306BCF67ED91F9E6725B4758C022E0B1EF4275BF7B6C5BFC11D45F9088B941F54EB1E59BB8BC39A0BF12307F5C4FDB70C581B23F76B63ACAE1CAA6B7902D52526735488A0EF13C6D9A51BFA4AB3AD8347796524D8EF6A167B5A41825D967E144E5140564251CCACB83E6B486F6B3CA3F7971506026C0B857F689962856DED4010ABD0BE621C3A3960A54E710C375F26375D7014103A4B54330C198AF126116D2276E11715F693877FAD7EF09CADB094AE91E1A1597"
const P = new BN(PHex, "hex")

// GHex is G for ElGamal
const GHex = "3FB32C9B73134D0B2E77506660EDBD484CA7B18F21EF205407F4793A1A0BA12510DBC15077BE463FFF4FED4AAC0BB555BE3A6C1B0C6B47B1BC3773BF7E8C6F62901228F8C28CBB18A55AE31341000A650196F931C77A57F2DDF463E5E9EC144B777DE62AAAB8A8628AC376D282D6ED3864E67982428EBC831D14348F6F2F9193B5045AF2767164E1DFC967C1FB3F2E55A4BD1BFFE83B9C80D052B985D182EA0ADB2A3B7313D3FE14C8484B1E052588B9B7D2BBD2DF016199ECD06E1557CD0915B3353BBB64E0EC377FD028370DF92B52C7891428CDC67EB6184B523D1DB246C32F63078490F00EF8D647D148D47954515E2327CFEF98C582664B4C0F6CC41659"
const G = new BN(GHex, "hex")

// QHex is Q for ElGamal
const QHex = "8CF83642A709A097B447997640129DA299B1A47D1EB3750BA308B0FE64F5FBD3"
const Q = new BN(QHex, "hex")

function GenerateKeys() {
    let sk = Math.ceil(Math.random() * Q);
    let pk = G.pow(sk).mod(P);

    return [sk, pk];
}

function Encrypt(m, pk) {
    let r = Math.round(Math.random() * Q);

    let a = G.pow(r).mod(P);
    let b = pk.pow(r).mod(P);
    b = b * m;

    return [a, b];
}

function Decrypt(a, b, pk) {
    let d = a.pow(pk).mod(P);
    let m = b.div(d).mod(P);

    return m;
}

function PickRandomNumber() {
    return Math.round(Math.random() * 52);
}

function VerifyEncryption(m, r, pk, a, b) { 
    //Here a and b are the displayed [a, b] of the shared encryption
    let a_correct = G.pow(r).mod(P);
    let b_correct = pk.pow(r).mul(m).mod(P);

    if(a == a_correct && b == b_correct) {
        let verified = True;
    }
    else {
        let verified = False;
    }

    return verified;
}

//Detect Collision Process
// 1. Compute E(m1/m2), all agree on this value
// 2. Transform Field and compute new G and Y
// 3. Users compute wi, ti, agree on c
// 4. Users check if w = Y^C * G^t; if yes, start again; if not, continue

function DivideMessages(a1, b1, a2, b2) {
    //[ai, bi] is the encryption of mi
    let A = a1.div(a2).mod(P);
    let B = b1.div(b2).mod(P);

    return [A, B];
}

function TransformField(A, B, pk) {
    // Here [A, B] is the encryption of the card
    
    //Choose an arbitrary hash function hash(G, pk, A, B, j) MOD P
    //where j = {1, 2}, the subscript of e_j
    let e_1 = 1; //placeholder
    // e_1 = hash(G, pk, A, B, 1)
    let e_2 = 1; //placeholder
    // e_2 = hash(G, pk, A, B, 2)

    let G_tr = ((G.pow(e_1)).mul((A.pow(e_2)))).mod(P); //Transformed generator
    let PK_tr = ((pk.pow(e_1)).mul((B.pow(e_2)))).mod(P); //Transformed Y

    return [G_tr, PK_tr];
}

function SchnorSig_W(G_tr) {
    //Every player runs this function separately
    let k_i = Math.round(Math.random() * Q);
    let w_i = G_tr.pow(k).mod(P);

    return [w_i, k_i];
}

//Players sum w_is and get w

function SchnorSig_T(w, k_i, sk) {
    // c = hash(mu, w) where hash is an arbitrary encryption, mu(message) doesn't matter
    let c = 1; //placeholder

    let t_i = (k_i - c.mul(sk)).mod(Q);

    return [t_i, c];
}

//Sum t_s under module and get t; agree on c

function DetectCollision(PK_tr, G_tr, w, t, c) {
    // w is the same as r in Schnor's paper

    //Check if logarithms are equal
    let w_comp = ((PK_tr.pow(c)).mul((G_tr.pow(t)))).mod(P);
    
    if(w == w_comp) {
        let collision = True;
    }
    else{
        let collision = False;
    }

    return collision;
}