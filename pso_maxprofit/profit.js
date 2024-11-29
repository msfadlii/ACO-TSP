function maxProfit(padi, jagung, kedelai) {
    const keuntunganPadi = 5000000; 
    const keuntunganJagung = 4000000;
    const keuntunganKedelai = 3000000;

    const lahanPadi = 1;
    const lahanJagung = 1;
    const lahanKedelai = 1;

    const kebutuhanAirPadi = 5000 * padi;
    const kebutuhanAirJagung = 4000 * jagung;
    const kebutuhanAirKedelai = 3000 * kedelai;

    const kebutuhanPupukPadi = 100 * padi;
    const kebutuhanPupukJagung = 80 * jagung;
    const kebutuhanPupukKedelai = 60 * kedelai;

    const totalAir = kebutuhanAirPadi + kebutuhanAirJagung + kebutuhanAirKedelai;
    const totalPupuk = kebutuhanPupukPadi + kebutuhanPupukJagung + kebutuhanPupukKedelai;

    const maxLahan = 5;
    const maxAir = 20000;
    const maxPupuk = 500;

    if (lahanPadi + lahanJagung + lahanKedelai > maxLahan || totalAir > maxAir || totalPupuk > maxPupuk) {
        return 0;
    } else {
        const totalKeuntungan = (padi * keuntunganPadi) + (jagung * keuntunganJagung) + (kedelai * keuntunganKedelai);
        return totalKeuntungan; 
    }
}

export { maxProfit };
