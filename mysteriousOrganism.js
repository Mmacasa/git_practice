// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)]
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
        newStrand.push(returnRandBase())
    }
    return newStrand
}

//Specimen factory function
const pAeqorFactory = (specimenNum, dna) => {
    //mutates one dna base
    const mutate = () => {
            let randBase = Math.floor(Math.random() * dna.length);
            let rand = Math.floor(Math.random() * 3);
            let newDna = [];

            switch (dna[randBase]) {
                case 'A':
                    newDna = ['T', 'C', 'G'];
                    dna[randBase] = newDna[rand];
                    break;
                case 'T':
                    newDna = ['A', 'C', 'G'];
                    dna[randBase] = newDna[rand];
                    break;
                case 'G':
                    newDna = ['A', 'T', 'C'];
                    dna[randBase] = newDna[rand];
                    break;
                case 'C':
                    newDna = ['A', 'T', 'G'];
                    dna[randBase] = newDna[rand];
                    break;
                default:
                    break;

            }
        }
        //compare two specimen dna
    const compareDna = obj => {
            let count = 0;
            let percent = 0;
            for (var i = 0; i < 15; i++) {
                if (dna[i] === obj.dna[i]) { count++; }

            }
            percent = Math.round((count / 15) * 100);
            console.log(`${specimenNum} and ${obj.specimenNum} have ${percent}% DNA in common.`);


        }
        //determine if subject is likely to survive
    const willLikelySurvive = () => {
        let count = 0;
        let percent = 0;
        for (var i = 0; i < 15; i++) {
            if (dna[i] === 'C' || dna[i] === 'G') { count++; }
        }
        percent = (Math.round(count / 15) * 100);
        if (percent > 60) { return true; } else { return false; }
    }

    //create the complementary dna strand
    const createComplimentStrand = () => {
        let complementaryStrand = [];
        for (var i = 0; i < dna.length; i++) {
            switch (dna[i]) {
                case 'A':
                    complementaryStrand.push('T');
                    break;
                case 'T':
                    complementaryStrand.push('A');
                    break;
                case 'G':
                    complementaryStrand.push('C');
                    break;
                case 'C':
                    complementaryStrand.push('G');
                    break;
                default:
                    break;
            }
        }
        return complementaryStrand;
    }


    return { specimenNum, dna, mutate, compareDna, willLikelySurvive, createComplimentStrand };
}

//create 10 Likely to survive specimens
let specimens = [];
let i = 1;
while (specimens.length < 10) {
    let newSpecimen = pAeqorFactory(i, mockUpStrand());
    if (newSpecimen.willLikelySurvive()) {
        specimens.push(newSpecimen);
        i++;
    }
}

//creates array of complementary dna pairs
let complimentarySpecimens = [];
for (var j = 0; j < specimens.length; j++) {
    complimentarySpecimens.push(specimens[j].createComplimentStrand());
}

//Prints 10 likely to survice DNA strands and complimentary DNA strand
for (var j = 0; j < specimens.length; j++) {
    console.log('DNA strand for specimen #: ' + specimens[j].specimenNum);
    console.log(specimens[j].dna);
    console.log('Complementary DNA strand for specimen #: ' + specimens[j].specimenNum);
    console.log(complimentarySpecimens[j]);
}