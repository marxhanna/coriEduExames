CREATE DATABASE cefaleia;
use cefaleia;

DROP TABLE IF EXISTS `sinais`;

CREATE TABLE `sinais` (
  `sinal_alarme` varchar(100) NOT NULL,
  `Diagnostico1` varchar(100) DEFAULT NULL,
  `Diagnostico2` varchar(100) DEFAULT NULL,
  `Diagnostico3` varchar(100) DEFAULT NULL,
  `Diagnostico4` varchar(100) DEFAULT NULL,
  `Diagnostico5` varchar(100) DEFAULT NULL,
  `Diagnostico6` varchar(100) DEFAULT NULL,
  `Diagnostico7` varchar(100) DEFAULT NULL,
  `Diagnostico8` varchar(100) DEFAULT NULL,
  `Diagnostico9` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`sinal_alarme`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `sinais` WRITE;

INSERT INTO `sinais` VALUES ('Convulsão','Eclâmpsia','neoplasia','meningite',NULL,NULL,NULL,NULL,NULL,NULL),('Déficit focal','HSA','AVCH','Dissecção','MAV','infecção','neoplasia','HIP',NULL,NULL),('Doenças reumatológicas','Infecção sistêmica','doenças do colágeno','LES com complicação neurológica',NULL,NULL,NULL,NULL,NULL,NULL),('Emagrecimento','Meningite','encefalite','doenças autoimunes','neoplasia',NULL,NULL,NULL,NULL,NULL),('Febre','Meningite','encefalite','doenças autoimunes','neoplasia',NULL,NULL,NULL,NULL,NULL),('Imunossupressão/HIV','Infecções oportunistas','abcesso cerebral','neoplasia',NULL,NULL,NULL,NULL,NULL,NULL),('Início após 50 anos','Arterite temporal','neoplasia','glaucoma',NULL,NULL,NULL,NULL,NULL,NULL),('Início súbito','HSA','Aneurisma','HIP','TVC','Dissecção','AVEH','neoplasia de fossa posterior',NULL,NULL),('Mudança do padrão de dor','HSA','Aneurisma','HIP','TVC','Dissecção',NULL,NULL,NULL,NULL),('Neoplasia','Metastase','meningite','abcesso cerebral',NULL,NULL,NULL,NULL,NULL,NULL),('Papiledema','Lesão expansiva','hipertensão benigna','meningite',NULL,NULL,NULL,NULL,NULL,NULL),('Piora progressiva da dor','HSD','hipertensão intracraniana','neoplasia','abuso de analgésico',NULL,NULL,NULL,NULL,NULL),('Primeiro episódio de cefaleia intensa','Aneurisma',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('Rash cutâneo','Rubeola','febre maculosa','parvovírus B19','Dengue','Chikungunya','Zika','Varicela',NULL,NULL),('Rebaixamento nível de consciência','HSA','AVCH','Dissecção','infecção','neoplasia','HIP',NULL,NULL,NULL),('Refratária ao tratamento','Migrânea','Migrânea','hipertensão intracraniana','neoplasia',NULL,NULL,NULL,NULL,NULL),('Rigidez de nuca','Meningite','HSA',NULL,NULL,NULL,NULL,NULL,NULL,NULL),('Thunderclap','HSA','Aneurisma','HIP','TVC','Dissecção',NULL,NULL,NULL,NULL),('Toxemia','Eclâmpsia',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);

UNLOCK TABLES;


DROP TABLE IF EXISTS `sinais`;

CREATE TABLE `sinais` (
  `sinal_alarme` varchar(100) NOT NULL,
  `Diagnostico1` varchar(100) DEFAULT NULL,
  `Diagnostico2` varchar(100) DEFAULT NULL,
  `Diagnostico3` varchar(100) DEFAULT NULL,
  `Diagnostico4` varchar(100) DEFAULT NULL,
  `Diagnostico5` varchar(100) DEFAULT NULL,
  `Diagnostico6` varchar(100) DEFAULT NULL,
  `Diagnostico7` varchar(100) DEFAULT NULL,
  `Diagnostico8` varchar(100) DEFAULT NULL,
  `Diagnostico9` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`sinal_alarme`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



LOCK TABLES `sinais` WRITE;

INSERT INTO `sinais` VALUES ('Convulsão','Eclâmpsia','neoplasia','meningite',NULL,NULL,NULL,NULL,NULL,NULL),('Déficit focal','HSA','AVCH','Dissecção','MAV','infecção','neoplasia','HIP',NULL,NULL),('Doenças reumatológicas','Infecção sistêmica','doenças do colágeno','LES com complicação neurológica',NULL,NULL,NULL,NULL,NULL,NULL),('Emagrecimento','Meningite','encefalite','doenças autoimunes','neoplasia',NULL,NULL,NULL,NULL,NULL),('Febre','Meningite','encefalite','doenças autoimunes','neoplasia',NULL,NULL,NULL,NULL,NULL),('Imunossupressão/HIV','Infecções oportunistas','abcesso cerebral','neoplasia',NULL,NULL,NULL,NULL,NULL,NULL),('Início após 50 anos','Arterite temporal','neoplasia','glaucoma',NULL,NULL,NULL,NULL,NULL,NULL),('Início súbito','HSA','Aneurisma','HIP','TVC','Dissecção','AVEH','neoplasia de fossa posterior',NULL,NULL),('Mudança do padrão de dor','HSA','Aneurisma','HIP','TVC','Dissecção',NULL,NULL,NULL,NULL),('Neoplasia','Metastase','meningite','abcesso cerebral',NULL,NULL,NULL,NULL,NULL,NULL),('Papiledema','Lesão expansiva','hipertensão benigna','meningite',NULL,NULL,NULL,NULL,NULL,NULL),('Piora progressiva da dor','HSD','hipertensão intracraniana','neoplasia','abuso de analgésico',NULL,NULL,NULL,NULL,NULL),('Primeiro episódio de cefaleia intensa','Aneurisma',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),('Rash cutâneo','Rubeola','febre maculosa','parvovírus B19','Dengue','Chikungunya','Zika','Varicela',NULL,NULL),('Rebaixamento nível de consciência','HSA','AVCH','Dissecção','infecção','neoplasia','HIP',NULL,NULL,NULL),('Refratária ao tratamento','Migrânea','Migrânea','hipertensão intracraniana','neoplasia',NULL,NULL,NULL,NULL,NULL),('Rigidez de nuca','Meningite','HSA',NULL,NULL,NULL,NULL,NULL,NULL,NULL),('Thunderclap','HSA','Aneurisma','HIP','TVC','Dissecção',NULL,NULL,NULL,NULL),('Toxemia','Eclâmpsia',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);

UNLOCK TABLES;


DROP TABLE IF EXISTS `exame`;

CREATE TABLE `exame` (
  `Exame` varchar(100) NOT NULL,
  `Descricao` text DEFAULT NULL,
  PRIMARY KEY (`Exame`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;




LOCK TABLES `exame` WRITE;

INSERT INTO `exame` VALUES ('Creatinina sérica','Identificar problemas renais, que podem ser causados por infecções, doenças renais ou outras condições;monitorar a progressão de doenças renais e a resposta ao tratamento.'),('Ecografia abdominal','Identificar possíveis infecções, inflamações ou outras condições nos órgãos abdominai;Avaliar a saúde de órgãos como fígado, vesícula biliar, rins e baço.'),('Estudo de vasos cranianos e cervicais','Identificar aneurismas, malformações arteriovenosas (MAVs), estenoses ou outras anormalidades vasculares;Avaliar a saúde vascular cerebral e identificar riscos de acidente vascular cerebral ou hemorragia.'),('Exames séricos','Identificar desequilíbrios metabólicos ou problemas hepáticos que podem afetar a saúde neurológica;Monitorar a função hepática e metabólica do corpo para prevenir complicações.'),('Fundoscopia','Identificar possíveis problemas neurológicos ou cardiovasculares com base nas alterações visuais;Diagnosticar condições como hipertensão intracraniana ou neuropatias ópticas.'),('Hemograma','Identificar anemia, infecções, distúrbios da coagulação ou outras alterações nos glóbulos vermelhos, brancos ou plaquetas;Avaliar a saúde geral e a capacidade do corpo de combater infecções.'),('PCR','Identificar processos infecciosos, inflamatórios e autoimunes;Acompanhar a resposta ao tratamento de doenças inflamatórias.'),('Proteinúria','Avaliar a função renal e identificar possíveis problemas nos rins ou inflamações; Identificar sinais de doença renal, como glomerulonefrite ou síndrome nefrótica.'),('Provas  autoimunes','Identificar doenças autoimunes que podem afetar o sistema nervoso e causar sintomas neurológicos; Auxiliar no diagnóstico de condições como lúpus eritematoso sistêmico ou esclerose múltipla.'),('Punção Lombar','Deve ser realizada em qualquer paciente com suspeita de HSA e resultados negativos ou questionáveis na TC ou RM de crânio; e devem ser coletados quatro tubos para contagem de hemácias. A punção é essencial no diagnóstico de meningite, mas o tratamento não deve ser atrasado por causa do exame e antes da coleta pode ser necessário realizar uma TC para garantir a segurança, pois pacientes com hipertensão craniana grave ou efeito de massa no SNC podem sofrer herniação uncal após punção.'),('Punção lombar após neuroimagem','Identificar possíveis infecções, inflamações ou sangramentos no sistema nervoso central após exames de imagem;Avaliar as características do líquido cefalorraquidiano e auxiliar no diagnóstico de condições neurológicas.'),('Ressonância Magnética','Tem sensibilidade similar, mas menos validada na emergência. Se mostra mais útil na suspeita de um aneurisma subagudo, na sequência T2. Principalmente porque após 7 dias a sensibilidade da TC cai para 50%.'),('Tomografia de Crânio','A TC é muito sensível para identificação de hemorragias agudas, vistas como lesões hiperdensas, e é considerado o padrão ouro para tal. Sem contraste com ou sem punção liquórica é o exame essencial para o diagnóstico de HSA. A TC realizada nas primeiras 24 horas tem 92% de sensibilidade (> 95% na primeira hora).'),('VHS','Níveis elevados podem indicar a presença de inflamação no corpo, mas não são específicos para uma condição;Auxiliar no monitoramento de doenças inflamatórias crônicas, como artrite reumatoide.');

UNLOCK TABLES;
