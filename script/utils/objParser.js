// ObjParser.js

export function parseObjFile(objFileContents) {
  // Plus de types, juste des tableaux vides standards
  const vertices = [];
  const uvs = [];
  const normals = [];
  const faces = [];

  const lines = objFileContents.split("\n");
  
  for (const line of lines) {
    // Petite sécurité : on ignore les commentaires (#) et les lignes vides
    if (line.startsWith("#") || line.trim() === "") continue;

    const t = line.trim().split(/\s+/);
    
    if (t[0] === "v") {
      // Position 3D (X, Y, Z)
      vertices.push([parseFloat(t[1]), parseFloat(t[2]), parseFloat(t[3])]);
      
    } else if (t[0] === "vt") {
      // Coordonnées de texture UV (U, V)
      uvs.push([parseFloat(t[1]), parseFloat(t[2])]);
      
    } else if (t[0] === "vn") {
      // Normales (X, Y, Z)
      normals.push([parseFloat(t[1]), parseFloat(t[2]), parseFloat(t[3])]);
      
    } else if (t[0] === "f") {
      // Les faces (les triangles)
      const face = [];
      for (let i = 1; i < t.length; i++) {
        const v = t[i].split("/");
        
        // Dans les fichiers .obj, on compte à partir de 1. 
        // On soustrait 1 pour que nos tableaux JS commencent bien à l'index 0.
        const vertexIndex = parseInt(v[0]) - 1;
        // On vérifie si les UV et normales sont présents dans le fichier avant de parser
        const uvIndex = v[1] ? parseInt(v[1]) - 1 : undefined;
        const normalIndex = v[2] ? parseInt(v[2]) - 1 : undefined;
        
        face.push({ vertexIndex, uvIndex, normalIndex });
      }
      faces.push({ vertices: face });
    }
  }

  return { vertices, uvs, normals, faces };
}